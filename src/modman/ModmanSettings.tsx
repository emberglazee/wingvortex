import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { withTranslation } from 'react-i18next';
import { Toggle, ComponentEx, More, util } from 'vortex-api';
import { enableSicarioIntegration, Features } from '../settings';
import { IState } from 'vortex-api/lib/types/api';
const { HelpBlock, FormGroup, ControlLabel } = require('react-bootstrap');

interface IBaseProps {
    t: any
}

interface IConnectedProps {
    enableSicarioIntegration: boolean;
}

interface IActionProps {
    onEnableSicario: (enable: boolean) => void;
}

type IProps = IConnectedProps & IActionProps & IBaseProps;

class ModmanSettings extends ComponentEx<IProps, {}> {

    public render(): JSX.Element {
        const { t, enableSicarioIntegration, onEnableSicario } = this.props;
        return (
            <form>
                <FormGroup>
                    <ControlLabel>{t('Enable automatic mod merging (modman)')}</ControlLabel>
                    <HelpBlock>
                        {t('Use the option below to enable automatically rebuilding your merged patch when you deploy your mods')}
                    </HelpBlock>
                    <Toggle
                        checked={enableSicarioIntegration}
                        onToggle={onEnableSicario}
                    >
                        {t("Enable automatic merging")}
                        <More id='pw-modman' name='modman Integration'>
                            {t("When deploying your mods, Vortex can automatically run modman for you, rebuilding your merged mod to include changes from any of your enabled mods and presets. This process creates or updates a mod containing your merged mod that will automatically be deployed to your game folder.")}
                        </More>
                    </Toggle>
                </FormGroup>
            </form>
        );
    }
}


function mapStateToProps(state: IState): IConnectedProps {
    return {
        enableSicarioIntegration: Features.isSicarioEnabled(state)
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, null, Redux.Action>): IActionProps {
    return {
        onEnableSicario: (enable: boolean) => dispatch(enableSicarioIntegration(enable))
    }
}

export default
withTranslation(['common', 'wingvortex', 'game-projectwingman'])(connect(mapStateToProps, mapDispatchToProps)(ModmanSettings));
